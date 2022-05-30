import axios from 'axios'
import loader from '../assets/loader.svg'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css' 
import React, {useState, useEffect} from 'react'
import { registerRoute } from '../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'

function SetAvatar() {
  return (
    <div>SetAvatar</div>
  )
}

export default SetAvatar