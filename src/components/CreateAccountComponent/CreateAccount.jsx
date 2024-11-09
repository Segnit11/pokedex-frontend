'use client'
import React from 'react';
import {Box, Typography, TextField, Button} from '@mui/material'
import PokedexLogo from '../PokedexLogo';
import Footer from '../Footer';
import Link from 'next/link';
const CreateAccount =  () =>{
    return (
        <>
            <div style={{marginTop:"100px"}}>
                <PokedexLogo/>
            </div>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"60vh"} marginBottom={"100px"}>
                <Box width={"650px"} height={"550px"} bgcolor={"#dddddd"} boxShadow={"0 4px 8px rgba(0, 0, 0, 0.2)"}>
                    <Typography variant = {"h3"} color={"textPrimary"} display={"flex"} justifyContent={"center"} marginBottom={"40px"}> Create Account</Typography>

                    <Box display={"flex"} marginBottom={"50px"}>
                        <Box marginLeft={"20px"}>
                            <Typography variant = {"h5"} color={"textPrimary"} display={"flex"} marginLeft={"40px"}> Enter Email: </Typography>
                            <Box display={"flex"} marginLeft={"20px"} marginTop={"10px"}>
                                <TextField id="outlined-basic" label="Enter Email" variant="outlined" />
                            </Box>
                        </Box>
                        <Box marginLeft={"175px"}>
                            <Typography variant = {"h5"} color={"textPrimary"} display={"flex"}> Create Username:</Typography>
                            <Box display={"flex"} marginTop={"10px"}>
                                <TextField id="outlined-basic" label="Enter Username" variant="outlined" />
                            </Box>
                        </Box>
                    </Box>

                    <Box display={"flex"} marginBottom={"50px"}>
                        <Box marginLeft={"20px"}>
                            <Typography variant = {"h5"} color={"textPrimary"} display={"flex"} marginLeft={"25px"}> Create Password: </Typography>
                            <Box display={"flex"} marginLeft={"20px"} marginTop={"10px"}>
                                <TextField id="outlined-basic" label="Enter Password" variant="outlined" />
                            </Box>
                        </Box>
                        <Box marginLeft={"175px"}>
                            <Typography variant = {"h5"} color={"textPrimary"} display={"flex"}> Confirm Password:</Typography>
                            <Box display={"flex"} marginTop={"10px"}>
                                <TextField id="outlined-basic" label="Enter Password" variant="outlined" />
                            </Box>
                        </Box>
                    </Box>
                    
                   
                    <Box display={"flex"} justifyContent={"center"} marginBottom={"50px"}>
                            <Button style={{width:'200px', height:'50px', fontSize:'16px'}} variant="contained" color="primary">
                            Create Account
                            </Button>
                        </Box>
                    <Link href = "/login">
                        <Typography style = {{textDecoration:'underline'}}variant = {"h8"} color={"textPrimary"} display={"flex"} justifyContent={"center"} marginLeft={"400px"} sx={{ cursor:'pointer',
                            '&:hover': { color:'rgba(0, 0, 0, 0.5)' }}}> Sign In</Typography>
                    </Link>
                </Box>
            </Box>
            <Footer/>
        </>
    )

}
export default CreateAccount;





