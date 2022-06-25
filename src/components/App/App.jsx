import React, { useState } from 'react';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Statistics from 'components/Statistics/Statistics';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

export function App() {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleBtnIncrement = name => {
    switch (name) {
      case 'good':
        setState({ ...state, good: state.good + 1 });
        break;

      case 'neutral':
        setState({ ...state, neutral: state.neutral + 1 });
        break;

      case 'bad':
        setState({ ...state, bad: state.bad + 1 });
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, feedback) => feedback + acc, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback() === 0) {
      return 0;
    }
    const totalPositiveFeedback = (state.good / countTotalFeedback()) * 100;

    return Math.round(totalPositiveFeedback);
  };

  const totalFeedback = countTotalFeedback();
  const positiveFeedbacks = countPositiveFeedbackPercentage();
  const stats = Object.entries(state);
  const options = Object.keys(state);

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleBtnIncrement}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 && (
          <Statistics
            stats={stats}
            total={totalFeedback}
            positivePercentage={positiveFeedbacks}
          />
        )}
        {totalFeedback <= 0 && <Notification message="There is no feedback" />}
      </Section>
    </div>
  );
}
