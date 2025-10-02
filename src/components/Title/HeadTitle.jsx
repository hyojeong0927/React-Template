function HeadTitle({
  level = 2, // h 태그 레벨 (기본 h2)
  title, // 메인 제목
  subTitle, // 보조 제목
  descript, // 설명 텍스트
  children, // 버튼 등 액션 영역
  align = 'left', // 정렬 옵션: left, center, right
  className = '',
}) {
  const Heading = `h${level}`;

  return (
    <div className={`title-wrap text-${align} ${className}`}>
      {title && <Heading className="text-xl font-bold">{title}</Heading>}

      {children && <div className="btn-area mt-2">{children}</div>}

      {subTitle && (
        <div className="title-sub text-gray-500 text-sm mt-1">{subTitle}</div>
      )}

      {descript && (
        <div className="title-dec text-gray-400 text-xs mt-1">{descript}</div>
      )}
    </div>
  );
}

export default HeadTitle;
