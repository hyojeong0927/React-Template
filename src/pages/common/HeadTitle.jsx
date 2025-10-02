import HeadTitle from '../../components/Title/HeadTitle';

export default function TitlePage() {
  return (
    <>
      <HeadTitle
        level={1}
        title="메인 페이지"
        subTitle="사이트 소개"
        descript="이 페이지는 전체 사이트의 개요를 설명합니다."
      >
        <button className="btn-primary">액션 버튼</button>
      </HeadTitle>
      <HeadTitle
        level={2}
        title="상품 목록"
        subTitle="추천 상품"
        descript="인기 있는 상품을 모았습니다."
      />
      <HeadTitle level={3} title="카드 타이틀" descript="카드 설명" />
    </>
  );
}
