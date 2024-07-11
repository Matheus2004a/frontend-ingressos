export interface Event {
  id: string
  name: string
  dtStart: string
  dtEnd: string
  location: string
}

export interface CreateEventRequest {
  name: string
  userId: string
  dtStart: string
  dtEnd: string
  location: string
}
