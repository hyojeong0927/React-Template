import InfoBox from '../../components/etc/InfoBox';

function InfoSample() {
  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center">Info</h1>
      <InfoBox
        title="시스템 알림"
        button={
          <div className="flex justify-end">
            <button className="btn-primary">확인</button>
            <button className="btn-primary ml-2">취소</button>
          </div>
        }
      >
        현재 시스템 점검 중입니다. 잠시 후 다시 시도해주세요.
      </InfoBox>
    </>
  );
}

export default InfoSample;
