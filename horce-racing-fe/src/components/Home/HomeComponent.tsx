import { Button } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import WalletContext from '../../store/WalletContext';
import classes from './HomeComponent.module.scss';
const HomeComponent = () => {
  const navigate = useNavigate();
  const [scrollToSection, setScrollToSection] = useState(false);
  const { user } = useContext(WalletContext);
  const bidHandler = () => {
    if(user.Id === 0) {
      navigate('/login');
    } else {
      navigate('/bid');
    }
  }
  useEffect(() => {
    if (scrollToSection) {
      const section = document.getElementById('gallery');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollToSection(false);
    }
  }, [scrollToSection]);
  const scrollDown = () => {
    setScrollToSection(true);
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
          <div className={classes.flex}>
            <Button variant="contained" onClick={bidHandler} color="success">
                Start Bidding
            </Button>
            <Button variant="contained" onClick={scrollDown} color="secondary">
                Explore Gallery
            </Button>
          </div>
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
        <div className={classes.section} id="section-2">
          <p>
            Unleash Your Inner Punter with Expert Strategies
          </p>
          <div>
            Hone your betting skills to maximize your winnings with our collection of expert tips and strategies. Fortune favors the prepared!
          </div>
        </div>
      </div>
      <div id="gallery" className={classes.gallery}>
        <p>Gallery</p>
        <div className={classes.imgContainer}>
          <img src="https://framerusercontent.com/images/dYBKJ0xJdSZEyGIrJFuzNneRKV8.jpg" alt="horce ride" />
          <img src="https://framerusercontent.com/images/uFcq3SZluhyCUEPheDiI8kCe6vI.jpg" alt="horce ride"/>
          <img src="https://images.unsplash.com/photo-1507514604110-ba3347c457f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9yc2UlMjByYWNpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="horce ride" />
          <img src="https://www.ft.com/__origami/service/image/v2/images/raw/https://d1e00ek4ebabms.cloudfront.net/production/21ce64b5-9745-4bff-aac5-9e105219aa81.jpg?source=next&fit=scale-down&quality=highest&width=1920&dpr=2" alt="horce ride" />
          <img src="https://images.news18.com/ibnlive/uploads/2022/05/rich-strike-16521614743x2.jpg?impolicy=website&width=510&height=356" alt="horce ride" />
        </div>
      </div>
    </div>
  )
};

export default HomeComponent;
