import { useRef, useState, useEffect, useCallback } from "react";

interface UseScrollCarouselReturn {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  handleScroll: (direction: "left" | "right") => void;
}

export const useScrollCarousel = (): UseScrollCarouselReturn => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      // 왼쪽 끝인지 확인 (스크롤 위치가 거의 0)
      setCanScrollLeft(scrollLeft > 10);

      // 오른쪽 끝인지 확인 (스크롤 위치 + 보이는 영역 >= 전체 너비)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  const handleScroll = useCallback(
    (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;

        const newScrollLeft =
          direction === "right"
            ? scrollContainerRef.current.scrollLeft + containerWidth
            : scrollContainerRef.current.scrollLeft - containerWidth;

        scrollContainerRef.current.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });

        // 스크롤 후 버튼 상태 업데이트 (애니메이션 고려)
        setTimeout(checkScrollButtons, 300);
      }
    },
    [checkScrollButtons],
  );

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      // 초기 상태 확인
      checkScrollButtons();

      // 스크롤 이벤트 리스너 추가
      scrollContainer.addEventListener("scroll", checkScrollButtons);

      // 윈도우 리사이즈 시에도 확인
      window.addEventListener("resize", checkScrollButtons);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [checkScrollButtons]);

  return {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    handleScroll,
  };
};
