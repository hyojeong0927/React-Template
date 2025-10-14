import StepIndicator from '@/components/step/StepIndicator';

export default function Step() {
  return (
    <>
      <h3 className="font-semibold mb-2 text-gray-700 text-center">
        Step 예시
      </h3>
      <div className="flex justify-center gap-20 py-10">
        <StepIndicator
          totalSteps={5}
          currentStep={3}
          steps={['기획', '디자인', '개발', '테스트', '배포']}
          dec={['1일', '2일', '3일', '4일', '5일']}
          isVertical={true}
        />

        <StepIndicator
          totalSteps={4}
          currentStep={2}
          steps={['기획', '디자인', '개발', '테스트']}
          dec={['1일', '2일', '3일', '4일']}
          isVertical={false}
        />
      </div>
    </>
  );
}
