import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [statistic, setStatistic] = useState([]);

    const getStatistic = async () => {
        console.log(`Getting Posts...`);
        axios
            .get("http://localhost:8000/api/statistic/")
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
            {statistic.map((day) => (
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
            ))}
        </div>
    );
}