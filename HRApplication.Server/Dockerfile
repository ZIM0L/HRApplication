#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["hrapplication.client/nuget.config", "hrapplication.client/"]
COPY ["HRApplication.Server/HRApplication.Server.csproj", "HRApplication.Server/"]
COPY ["hrapplication.client/hrapplication.client.esproj", "hrapplication.client/"]
RUN dotnet restore "./HRApplication.Server/HRApplication.Server.csproj"
COPY . .
WORKDIR "/src/HRApplication.Server"
RUN dotnet build "./HRApplication.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./HRApplication.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HRApplication.Server.dll"]