import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Check } from 'lucide-react';
import Typography from '@mui/material/Typography';

const SubtopicListItem = ({ subtopic, completed }) => {
  return (
    <ListItem
      sx={{
        paddingLeft: '28px',
        marginBottom: '8px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        borderRadius: '0 1000px 1000px 0',
      }}
    >
      <Check
        color={completed ? '#4caf50' : 'grey'}
        size={16}
        style={{ marginRight: '12px', flexShrink: 0 }}
      />
      <ListItemText
        primary={
          <Typography variant="body1" sx={{ color: 'white' }}>
            {subtopic.subtopic}
          </Typography>
        }
      />
    </ListItem>
  );
};

const MenuList = ({ data, completionStatus }) => {
  return (
    <List
      sx={{
        paddingTop: 4,
        paddingLeft: 0,
        paddingRight: 2,
        backgroundColor: '#121212',
        height: '100vh',
      }}
    >
      {data.dashboard.map((quizz, index) => (
        <div key={index}>
          <ListItem
            sx={{
              padding: 0,
              marginBottom: '8px',
              height: '32px',
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              borderRadius: '0 1000px 1000px 0',
            }}
          >
            <Check
              color={
                completionStatus[index].topicCompleted ? '#4caf50' : 'grey'
              }
              size={20}
              style={{ marginRight: '12px', flexShrink: 0 }}
            />
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{ color: 'white', fontWeight: 'bold' }}
                >
                  {quizz.topic}
                </Typography>
              }
            />
          </ListItem>
          {quizz.subtopics.map((subtopic, subIndex) => (
            <SubtopicListItem
              key={`${index}-${subIndex}`}
              subtopic={subtopic}
              completed={completionStatus[index].subtopics[subIndex]}
            />
          ))}
        </div>
      ))}
    </List>
  );
};
export default MenuList;
