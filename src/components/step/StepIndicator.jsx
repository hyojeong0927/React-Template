import './step-indicator.css';

export default function StepIndicator({
  totalSteps = 4,
  currentStep = 1,
  steps = ['기획', '디자인', '개발', '테스트', '배포'],
  dec = [],
  isVertical = false,
}) {
  return (
    <div className={`step-header ${isVertical ? 'vertical' : 'horizontal'}`}>
      {steps.slice(0, totalSteps).map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div
            key={stepNum}
            className={`step-item ${isActive ? 'active' : ''} ${
              isCompleted ? 'completed' : ''
            }`}
          >
            <span className="step-number">{stepNum}</span>
            <span className="step-label">{label}</span>
            {dec[i] && <span className="step-dec">{dec[i]}</span>}
            {stepNum < totalSteps && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
}
