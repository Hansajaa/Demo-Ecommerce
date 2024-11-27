import { Rating } from "flowbite-react";

export default function ProductRatings() {
  return (
    <Rating className="-ml-1 mt-1">
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star filled={false} />
    </Rating>
  );
}