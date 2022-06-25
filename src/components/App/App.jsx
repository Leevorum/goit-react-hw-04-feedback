import React, { Component } from 'react';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Statistics from 'components/Statistics/Statistics';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleBtnIncrement = name => {
    this.setState(prevState => {
      return {
        [name]: prevState[name] + 1,
      };
    });
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce(
      (acc, feedback) => feedback + acc,
      0,
    );
  };

  countPositiveFeedbackPercentage = () => {
    if (this.countTotalFeedback() === 0) {
      return 0;
    }
    const totalPositiveFeedback =
      (this.state.good / this.countTotalFeedback()) * 100;

    return Math.round(totalPositiveFeedback);
  };

  render() {
    const totalFeedback = this.countPositiveFeedbackPercentage();
    const stats = Object.entries(this.state);
    const total = this.countTotalFeedback();
    const options = Object.keys(this.state);

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.handleBtnIncrement}
          />
        </Section>

        <Section title="Statistics">
          {totalFeedback > 0 && (
            <Statistics
              stats={stats}
              total={total}
              positivePercentage={totalFeedback}
            />
          )}
          {totalFeedback < 0 && <Notification message="There is no feedback" />}
        </Section>
      </div>
    );
  }
}
