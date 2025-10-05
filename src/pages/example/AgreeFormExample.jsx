import { useState } from 'react';
import Agree from '../../components/agree/Agree';
import PrivacyContent from './PrivacyContent';
import MarketingContent from './MarketingContent';
import ServiceContent from './ServiceContent';

export default function AgreeForm() {
  const [agreements, setAgreements] = useState([]);

  const options = [
    {
      value: 'privacy',
      label: '개인정보 수집 및 이용 동의 (필수)',
      ariaLabel: '개인정보 동의',
      children: 'privacy',
      checked: true,
      disabled: false,
      required: true,
    },
    {
      value: 'service',
      label: '서비스 이용 약관 동의 (필수)',
      ariaLabel: '서비스 이용 약관 동의',
      children: 'service',
      checked: true,
      required: true,
    },
    {
      value: 'marketing',
      label: '마케팅 정보 수신 동의 (선택)',
      ariaLabel: '마케팅 정보 수신 동의',
      children: 'marketing',
    },
  ];

  const contents = {
    privacy: <PrivacyContent />,
    marketing: <MarketingContent />,
    service: <ServiceContent />,
  };

  const handleSubmit = e => {
    e.preventDefault();

    const requiredOptions = options.filter(opt => opt.required || opt.disabled);
    const missing = requiredOptions.filter(
      opt => !agreements.includes(opt.value),
    );

    if (missing.length > 0) {
      alert('필수 약관에 동의해야 제출할 수 있습니다.');
      return;
    }

    alert('제출 완료!');
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center">약관 예시</h1>
      <form onSubmit={handleSubmit}>
        <Agree
          title="서비스 이용 동의서"
          options={options}
          value={agreements}
          onChange={setAgreements}
          contents={contents}
          showSelectAll={true}
          selectAllLabel="전체 동의"
          subtitle="모든 약관에 동의해주세요."
        >
          <div>전체 안내 문구</div>
        </Agree>

        <button type="submit">제출</button>
      </form>
    </>
  );
}
