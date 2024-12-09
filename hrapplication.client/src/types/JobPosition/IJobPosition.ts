
export interface IJobPosition {
  jobPositionId: string,
  title: string,
  description: string,
  isActive: boolean,
  isRecruting: string,
  createdDate: string,
  updatedDate: string
}
export interface IAddJobPosition {
    title: string,
    description: string,
}
