import { Spinner } from './Spinner'
import { Button } from './ui/button'

interface ButtonSpinnerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean
  children: React.ReactNode
}

export function ButtonSpinner({
  isLoading = false,
  children,
  ...rest
}: ButtonSpinnerProps) {
  return (
    <Button disabled={isLoading} {...rest}>
      {isLoading ? <Spinner className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}
