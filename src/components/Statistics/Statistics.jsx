import PropTypes, { number } from 'prop-types';
import s from './Statistics.module.css';

export default function Statistics({ stats, total, positivePercentage }) {
  return (
    <ul className={s.list}>
      {stats.map(([name, value]) => {
        return (
          <li key={name} className={s.text}>
            {name}: {value}
          </li>
        );
      })}
      <li key={'total'} className={s.text}>
        Total: {total}
      </li>
      <li key={'feedback'} className={s.text}>
        Positive feedback: {positivePercentage}%
      </li>
    </ul>
  );
}

Statistics.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ).isRequired,
  total: PropTypes.number.isRequired,
  positivePercentage: number.isRequired,
};
