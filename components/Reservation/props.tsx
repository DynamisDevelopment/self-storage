export type ControlsProps = {
  next: () => void
  prev: () => void
}

export type SlideProps = {
  setData: (data: any) => void
  data: any
} & ControlsProps
