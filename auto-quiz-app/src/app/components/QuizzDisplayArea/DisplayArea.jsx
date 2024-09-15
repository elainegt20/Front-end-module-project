'use client'
import MenuList from '../sidebar/MenuList';
import Header from '../sidebar/Header';
import TitleSection from '../sidebar/TitleSection';
import SideBarContainer from '../sidebar/SideBarContainer';
import QuizzCard from '../QuizzCard/QuizzCard';
import React from 'react';
import styles from './DisplayArea.module.css'
import { useRouter } from 'next/navigation';

const data = {
    "dashboard": [
        {
            "topic": "Science",
            "subtopics": [
                {
                    "subtopic": "Physics",
                    "questions": [
                        {
                            "question": "What is the speed of light?",
                            "correct_answer": "299,792,458 meters per second",
                            "answers": ["150,000,000 meters per second", "300,000,000 meters per second", "299,792,458 meters per second", "299,792,000 meters per second"]
                        },
                        {
                            "question": "Who developed the theory of relativity?",
                            "correct_answer": "Albert Einstein",
                            "answers": ["Isaac Newton", "Galileo Galilei", "Nikola Tesla"]
                        }
                    ]
                },
                {
                    "subtopic": "Chemistry",
                    "questions": [
                        {
                            "question": "What is the chemical symbol for water?",
                            "correct_answer": "H2O",
                            "answers": ["O2", "H2", "HO"]
                        },
                        {
                            "question": "What is the pH level of pure water?",
                            "correct_answer": "7",
                            "answers": ["6", "8", "5"]
                        }
                    ]
                }
            ]
        },
        {
            "topic": "Mathematics",
            "subtopics": [
                {
                    "subtopic": "Algebra",
                    "questions": [
                        {
                            "question": "Solve for x: 2x + 3 = 7",
                            "correct_answer": "2",
                            "answers": ["1", "3", "4"]
                        },
                        {
                            "question": "What is the quadratic formula?",
                            "correct_answer": "x = (-b ± √(b²-4ac)) / 2a",
                            "answers": ["x = (-b ± √(b²+4ac)) / 2a", "x = (b ± √(b²-4ac)) / 2a", "x = (-b ± √(b²-4ac)) / a"]
                        }
                    ]
                },
                {
                    "subtopic": "Geometry",
                    "questions": [
                        {
                            "question": "What is the sum of the interior angles of a triangle?",
                            "correct_answer": "180 degrees",
                            "answers": ["90 degrees", "360 degrees", "270 degrees"]
                        },
                        {
                            "question": "What is the Pythagorean theorem?",
                            "correct_answer": "a² + b² = c²",
                            "answers": ["a² - b² = c²", "a² + b = c²", "a + b² = c²"]
                        }
                    ]
                }
            ]
        },
        {
            "topic": "History",
            "subtopics": [
                {
                    "subtopic": "World War II",
                    "questions": [
                        {
                            "question": "In which year did World War II begin?",
                            "correct_answer": "1939",
                            "answers": ["1941", "1938", "1940"]
                        },
                        {
                            "question": "Who was the Prime Minister of the United Kingdom during most of World War II?",
                            "correct_answer": "Winston Churchill",
                            "answers": ["Neville Chamberlain", "Clement Attlee", "Anthony Eden"]
                        }
                    ]
                },
                {
                    "subtopic": "Ancient Egypt",
                    "questions": [
                        {
                            "question": "Who was the first female pharaoh of Egypt?",
                            "correct_answer": "Hatshepsut",
                            "answers": ["Cleopatra", "Nefertiti", "Sobekneferu"]
                        },
                        {
                            "question": "What is the name of the ancient Egyptian writing system?",
                            "correct_answer": "Hieroglyphics",
                            "answers": ["Cuneiform", "Latin", "Sanskrit"]
                        }
                    ]
                }
            ]
        }
    ]
};


const DisplayArea = ({data}) => {

    const router = useRouter(); // Initialize the router

  // Function to handle button click and navigate to the results page
  const goToResults = () => {
    router.push('/resultsPage'); // Navigate to the results page
  };

    return(
        <div className={styles.parentContainer}>
    <div className={styles.sideBarContainer}>
        <SideBarContainer>
            <Header />
            <TitleSection />
            <MenuList data={data}/>
        </SideBarContainer>
    </div>
    <div className={styles.navBarContainer}></div>
    <div className={styles.quizzContainer}>
        <QuizzCard data={data} />

    </div>
    <footer className={styles.footer}>
        <button className={styles.button} onClick={goToResults}>go to results</button>
    </footer>
</div>
    )
}

export default DisplayArea;