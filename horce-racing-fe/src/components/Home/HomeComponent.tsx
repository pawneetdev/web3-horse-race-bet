import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import classes from './HomeComponent.module.scss';
const HomeComponent = () => {
  const navigate = useNavigate();
  const bidHandler = () => {
    navigate('/bid');
  }
  return (
    <div className={classes.outer}>
      <div className={classes.wrapper}>
        <div className={classes.svgWrapper}>
            <svg viewBox="0 0 220 220" fill="none">
              <path d="M93.5 57.3509L143.689 86.3274C145.545 87.3991 146.689 89.3799 146.689 91.5235V149.477C146.689 151.62 145.545 153.601 143.689 154.673L93.5 183.649C91.6436 184.721 89.3564 184.721 87.5 183.649L37.3112 154.673C35.4548 153.601 34.3112 151.62 34.3112 149.476V91.5235C34.3112 89.3799 35.4548 87.3991 37.3112 86.3274L87.5 57.3509C89.3564 56.2791 91.6436 56.2791 93.5 57.3509Z" fill="rgb(202, 83, 16)" stroke="rgb(202, 83, 16)" strokeWidth="8"></path>
              <path d="M113 46.3509L163.622 75.5774C165.478 76.6491 166.622 78.6299 166.622 80.7735V139.227C166.622 141.37 165.478 143.351 163.622 144.423L113 173.649C111.144 174.721 108.856 174.721 107 173.649L56.3782 144.423C54.5218 143.351 53.3782 141.37 53.3782 139.226V80.7735C53.3782 78.6299 54.5218 76.6491 56.3782 75.5774L107 46.3509C108.856 45.2791 111.144 45.2791 113 46.3509Z" stroke="rgb(251, 186, 114)" strokeWidth="8"></path>
            </svg>
          </div>
          <p>Race to the Finish Line!</p>
          <Button variant="contained" onClick={bidHandler}>
              Start Bidding
          </Button>
        </div>
      <div className={classes.sectionWrapper}>
        <div className={classes.section}>
          <p>
            Giddy Up: The Thrilling World of Horse Betting
          </p>
          <div>
            Discover the heart-pounding excitement of the race track as you place bets on your favorite horses. Get ready to experience the rush!
          </div>
        </div>
        <img src="https://framerusercontent.com/images/UQnF82QJuM9KhwVmtKQ4LjtE2c0.jpg?scale-down-to=512" alt="horce ride" />
      </div>
      <div className={classes.sectionWrapper}>
        <img src="https://framerusercontent.com/images/dYBKJ0xJdSZEyGIrJFuzNneRKV8.jpg" alt="horce ride" />
        <div className={classes.section}>
          <p>
            Unleash Your Inner Punter with Expert Strategies
          </p>
          <div>
            Hone your betting skills to maximize your winnings with our collection of expert tips and strategies. Fortune favors the prepared!
          </div>
        </div>
      </div>
    </div>
  )
};

export default HomeComponent;
