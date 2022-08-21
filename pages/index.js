import Head from 'next/head'
import Navbar from "../components/Navbar";
import Action from "../components/pageComponents/homePageComponents/Action";
import Card from "../components/pageComponents/homePageComponents/Card";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await axios.get("https://cosbapi.herokuapp.com/api/courses/courses-list-view/")
                .then(res => {
                    setCourseData(res.data);

                })

        }

        fetchData().then(r => setLoading(false));
    }, [])

    const onSearchChange = async (e) => {
        const searchValue = e.target ? e.target.value : e.current.value;
        setLoading(true);
        searchValue.length > 0 ? await axios.get(`https://cosbapi.herokuapp.com/api/courses/courses-search-view/${searchValue}`).then(res => {
            setCourseData(res.data);
            setLoading(false);
        }) : await axios.get("https://cosbapi.herokuapp.com/api/courses/courses-list-view/").then(res => {
            setCourseData(res.data);
            setLoading(false);
        })

    }

    return (
        <div>
            <Head>
                <title>cosb</title>
                <meta name="description" content="cosb"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Navbar/>
            <Action onSearchChange={onSearchChange}/>


            {loading ? (
                <div className={'flex justify-center items-center w-full'}>
                    <Box alignItems="center" justifyContent="center"><CircularProgress/></Box>
                    {/*<Skeleton variant="rectangular" width={'80%'} height={200} />*/}
                </div>
            ) : (
                courseData.map(course => (
                    <Card key={course.id}
                          id={course.id}
                          title={course.name}
                          description={course.description}
                          image={course.image}
                          rating={course.overall_rating}
                          reviews={course.num_of_reviews}
                          platform={course.platform}
                          price={course.price}
                    />))
            )}

        </div>

    )
}
