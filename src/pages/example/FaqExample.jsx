import Accordion from '../../components/Accordion';

const faqItems = [
  {
    title: '회원가입은 무료인가요?',
    content: '네, 모든 회원가입은 무료입니다.',
  },
  {
    title: '비밀번호를 잊어버리면 어떻게 하나요?',
    content:
      "로그인 화면에서 '비밀번호 찾기'를 클릭하면 재설정 링크를 이메일로 받을 수 있습니다.",
  },
  {
    title: '환불 정책은 어떻게 되나요?',
    content:
      '상품 구매 후 7일 이내에 환불 신청이 가능합니다.상품 구매 후 7일 이내에 환불 신청이 가능합니다.상품 구매 후 7일 이내에 환불 신청이 가능합니다.상품 구매 후 7일 이내에 환불 신청이 가능합니다.상품 구매 후 7일 이내에 환불 신청이 가능합니다.상품 구매 후 7일 이내에 환불 신청이 가능합니다.',
  },
];

export default function FAQ() {
  return <Accordion items={faqItems} allowMultipleOpen={false} />;
}
