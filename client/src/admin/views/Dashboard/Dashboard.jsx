import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from './Chart';




export default function Dashboard() {
    const [statistic, setStatistic] = useState([]);

    const getStatistic = async () => {
        // console.log(`Getting Posts...`);
        axios
            .get("/api/statistic/")
            .then((res) => {
                setStatistic(res.data.statistic);
                console.log(res.data.statistic);
            })
            .catch((err) => {
                console.log("Error from get all statistic informations");
            });
    }

    useEffect(() => {
        getStatistic();
    }, []);

    return (
        <div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            {["mediaNumber", "blogNumber", "storeNumber", "messageNumber", "viewsNumber"].map((value) => (
                                <Grid key={value} item>
                                    <Card variant="outlined">
                                        <CardContent>

                                            <Typography variant="h5" component="h2">
                                                {value}
                                            </Typography>

                                            <Chart data={statistic} y={value}></Chart>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            {/* {statistic.map((day) => (
                <div>
                    <div>
                        {day.date}
                    </div>
                    <div>
                        Media Number: {day.mediaNumber}
                    </div>
                    <div>
                        Blogs Number: {day.blogNumber}
                    </div>
                    <div>
                        Items Number: {day.storeNumber}
                    </div>
                    <div>
                        Message Number: {day.messageNumber}
                    </div>
                    <div>
                        Views: {day.viewsNumber}
                    </div>
                </div>
            ))} */}



        </div>
    );
}