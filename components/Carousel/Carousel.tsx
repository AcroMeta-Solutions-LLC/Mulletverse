import { Fragment, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Chevron, DataSlider, SliderWrapper } from "./CarouselStyled";

type CarouselPropType = { children: React.ReactNode; size: number };

function Carousel({ children, size }: CarouselPropType) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [shouldShowLeftArrow, setShouldShowLeftArrow] = useState(false);

  const scrollSlider = (direction: "left" | "right") => {
    const scrollLeft = sliderRef.current && sliderRef.current.offsetWidth ? sliderRef.current.offsetWidth : 0;
    if (scrollLeft > 0) setShouldShowLeftArrow(true);

    const offset = sliderRef.current && sliderRef.current.offsetWidth ? sliderRef.current.offsetWidth : 0;
    switch (direction) {
      case "left":
        sliderRef?.current?.scrollTo({ left: sliderRef?.current.scrollLeft - offset });
        break;
      case "right":
        sliderRef?.current?.scrollTo({ left: sliderRef?.current.scrollLeft + offset });
        break;
      default:
        break;
    }
  };

  return (
    <SliderWrapper>
      {size > 0 && (
        <Fragment>
          {shouldShowLeftArrow && (
            <Chevron onClick={() => scrollSlider("left")}>
              <FiChevronLeft size={30} />
            </Chevron>
          )}
          <DataSlider ref={sliderRef}>{children}</DataSlider>
          <Chevron onClick={() => scrollSlider("right")}>
            <FiChevronRight size={30} />
          </Chevron>
        </Fragment>
      )}
    </SliderWrapper>
  );
}

export default Carousel;
