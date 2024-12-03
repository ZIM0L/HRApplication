
export interface IJobPosition {
  jobPositionId: string,
  title: string,
  description: string,
  isActive: string,
  isRecruting: string,
  createdAt: string,
  updatedAt: string
}
export interface IAddJobPosition {
    title: string,
    description: string,
}