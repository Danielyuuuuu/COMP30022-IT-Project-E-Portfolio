import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import { CallMissedSharp } from '@material-ui/icons';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import image from '../../assets/img/sidebar-2.jpg';
import DropzoneAreaExample from '../../components/DropzoneAreaExample';

const tileData = [
    {
        img: image,
        title: 'image1',
        author: 'author1',
        colss: 2,
    },
    {
        img: image,
        title: 'image1',
        author: 'author1',
        colss: 3,
    },
    {
        img: image,
        title: 'image3',
        author: 'author3',
        colss: 4,
    },
    {
        img: image,
        title: 'image2',
        author: 'author2',
        colss: 6,
    },
    {
        img: image,
        title: 'image2',
        author: 'author2',
        colss: 6,
    },
    {
        img: image,
        title: 'image2',
        author: 'author2',
        colss: 6,
    },
    {
        img: image,
        title: 'image2',
        author: 'author2',
        colss: 6,
    },
    {
        img: image,
        title: 'image2',
        author: 'author2',
        colss: 6,
    },
    {
        img: image,
        title: 'image2',
        author: 'author2',
        colss: 6,
    },
    {
        img: image,
        title: 'image2',
        author: 'author2',
        colss: 6,
    },
    {
        img: image,
        title: 'image2',
        author: 'author2',
        colss: 6,
    },
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    
  },


  control: {
    padding: theme.spacing(2),
  },

  gridList: {
    height: '800px',
    width: '100%',
  },

  paper: {
    height: '100%',
    width: '100%',
  }

}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <div>
        <Grid container spacing={2} direction="row" justify="space-around" alignItems="stretch">

            <Grid item xs={8} className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <h3>Media</h3>
                    <GridList cellHeight={180} className={classes.gridList} cols={3}>
                        
                        {tileData.map((tile) => (
                        <GridListTile key={tile.img}>
                            <img src={tile.img} alt={tile.title} />
                            <GridListTileBar
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                <InfoIcon />
                                </IconButton>
                            }
                            />
                        </GridListTile>
                        ))}
                    </GridList>
                </Paper>
            </Grid>

            <Grid item xs={4} className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <h3>Informations</h3>
                    <p>File Name:</p>
                    <p>Describe:</p>
                    <p>URL:</p>
                    <DropzoneAreaExample />
                </Paper>
            </Grid>

        </Grid>

    </div>
  );
}
