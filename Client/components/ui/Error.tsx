import { tv } from "tailwind-variants";

export interface ErrorProps {
  page?: boolean;
}

const errorStyle = tv({
  base: "w-full flex items-center justify-center",
  variants: {
    page: {
      true: "h-screen",
      false: "h-full",
    },
  },
});

export function Error({ page = true }: ErrorProps) {
  return (
    <div className={errorStyle({ page })}>
      <h1>Error Please refresh this screen</h1>
      {/* <a href="#"> Click here to refresh</a> */}
    </div>
  );
}
