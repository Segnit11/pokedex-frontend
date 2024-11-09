"use client"
import React from 'react';
import {Box, Typography, TextField, Button} from '@mui/material'
import PokedexLogo from '../PokedexLogo';
import Footer from '../Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const SignIn =  () =>{
    // const router = useRouter();
    // const handleOnSubmit = () =>{
    //     router.push('/pokemons')
    // }
    return (
        <>
            <div style={{marginTop:"100px"}}>
                <PokedexLogo/>
            </div>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"60vh"} marginBottom={"100px"}>
                <Box width={"600px"} height={"500px"} bgcolor={"#dddddd"} boxShadow={"0 4px 8px rgba(0, 0, 0, 0.2)"}>
                    <Typography variant = {"h3"} color={"textPrimary"} display={"flex"} justifyContent={"center"} marginBottom={"40px"}> Log In</Typography>
                    <Typography variant = {"h5"} color={"textPrimary"} display={"flex"} justifyContent={"center"}> Username</Typography>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={"10px"} marginBottom={"30px"}>
                        <TextField id="outlined-basic" label="Enter Username" variant="outlined"/>
                    </Box>
                    <Typography variant = {"h5"} color={"textPrimary"} display={"flex"} justifyContent={"center"}> Password</Typography>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} marginTop={"10px"} marginBottom={"30px"}>
                        <TextField id="outlined-basic" label="Enter Passowrd" variant="outlined" />
                    </Box>
                    <Box display={"flex"} justifyContent={"center"} marginBottom={"50px"}>
                        <Button style={{width:'200px', height:'50px', fontSize:'16px'}} variant="contained" color="primary">
                        Sign In
                        </Button>
                    </Box>
                    <Link href="/create-account">
                        <Typography style = {{textDecoration:'underline'}}variant = {"h8"} color={"textPrimary"} display={"flex"} justifyContent={"center"} marginLeft={"400px"} sx={{ cursor:'pointer',
                        '&:hover': { color:'rgba(0, 0, 0, 0.5)' }}}> Create an account</Typography>
                    </Link>
                </Box>
            </Box>
            <Footer/>
        </>
    )

}
export default SignIn;


