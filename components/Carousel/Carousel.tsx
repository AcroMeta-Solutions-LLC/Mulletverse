/* eslint-disable */
import { Fragment, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Loading } from "web3uikit";
import COLORS from "../../constants/colors";
import { Chevron, DataSlider, Loader, SliderWrapper } from "./CarouselStyled";

type CarouselPropType = { children: React.ReactNode; size: number; isLoading?: boolean };

function Carousel({ children, size, isLoading }: CarouselPropType) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [shouldShowLeftArrow, setShouldShowLeftArrow] = useState(false);
  const [shouldShowRightArrow, setShouldShowRightArrow] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!sliderRef?.current) return;
    const scrollWidth = sliderRef.current.scrollWidth;
    const size = Math.floor(scrollWidth / window.innerWidth);
    setPageSize(size);
    setShouldShowLeftArrow(currentPage !== 0);
    setShouldShowRightArrow(currentPage <= pageSize);
  }, [isLoading, currentPage, pageSize]);

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef?.current) return;
    const offset = sliderRef.current.offsetWidth;

    switch (direction) {
      case "left":
        setCurrentPage(currentPage === 0 ? currentPage : currentPage - 1);
        sliderRef.current.scrollTo({ left: sliderRef.current.scrollLeft - offset });
        break;
      case "right":
        setCurrentPage(currentPage === pageSize + 1 ? currentPage : currentPage + 1);
        sliderRef.current.scrollTo({ left: sliderRef.current.scrollLeft + offset });
        break;
      default:
        break;
    }
  };

  return isLoading ? (
    <Loader>
      <Loading spinnerColor={COLORS.PURPLE} />
    </Loader>
  ) : (
    <SliderWrapper>
      {size > 0 && (
        <Fragment>
          {/* {shouldShowLeftArrow && (
            <Chevron onClick={() => scrollSlider("left")}>
              <FiChevronLeft size={30} />
            </Chevron>
          )} */}
          <DataSlider ref={sliderRef}>{children}</DataSlider>
          {/* {shouldShowRightArrow && (
            <Chevron onClick={() => scrollSlider("right")}>
              <FiChevronRight size={30} />
            </Chevron>
          )} */}
        </Fragment>
      )}
    </SliderWrapper>
  );
}

export default Carousel;
