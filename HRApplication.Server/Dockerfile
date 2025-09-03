FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Kopiujemy tylko plik csproj i przywracamy zależności
COPY ["HRApplication.Server.csproj", "./"]
RUN dotnet restore "./HRApplication.Server.csproj"

# Kopiujemy resztę kodu
COPY . .

# Build
RUN dotnet build "HRApplication.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HRApplication.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HRApplication.Server.dll"]
