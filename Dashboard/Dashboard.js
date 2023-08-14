import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import {useEffect,useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import Count from './Count';
import Femalecount from "./Femalecount";
import Above from "./Above";
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from "recharts";
import './App.css';
import {useNavigate} from 'react-router-dom';
import Total from "./Total";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./firebase-connection";

const Dashboard = (props) => {
    const[record,setRecord] = useState(props.item);
    const[refresh,setRefresh] = useState(false);
    const[logout, setLogout] = useState(false);
    const Navigate = useNavigate();
    const defaultMaterialTheme = createTheme();
    const [pmscountvalue, setPmscountvalue] = useState(0);

    const [isAuthenticated, setIsAuthenticated] = useState(props.auth);


    var today = new Date();

    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding a leading zero if needed
    var day = today.getDate().toString().padStart(2, '0'); // Adding a leading zero if needed
    
    var date = year + '-' + month + '-' + day;
    
    var warrantycount = record.filter(warranty => warranty.To > date);

    console.log(date);

const splitDataIntoThreeMonths = () => {

      // Helper function to calculate PMS session end date
    function calculatePMSSessionDate(startDate, pms, index) {
    const month = startDate.getMonth() + 1;
    const year = startDate.getFullYear();
    const pmsCount = Math.max(1, Math.min(pms, 12)); // Ensure pms is within 1 to 12
    const pmsMonthDate = month + (Math.floor(12 / pmsCount) * index);
    const yearIncrement = Math.floor((month + (Math.floor(12 / pmsCount) * index) - 1) / 12);
    return new Date(year + yearIncrement, pmsMonthDate % 12 || 12, 0);
  }
  
  // Assuming warrantycount is an array containing objects with 'From' and 'PMS' properties
  if (Array.isArray(warrantycount)) {
    var _pmsvalue = 0 ; 
    warrantycount.forEach((item) => {
      const pmscustomer = item.Customer;
      const itemDate = item.From;
      const startDate = new Date(itemDate);
      const pms = parseInt(item.PMS, 10);
      const totalpms = pms * item.Warranty; 
      for (let i = 1; i <= totalpms; i++) {
        const periodEndDate = calculatePMSSessionDate(startDate, pms, i);
        const del = periodEndDate.toISOString().slice(0, 7);
        const current = year + '-' + month;
        if (del == current) {
            toast.warn("This month PMS for this customer:" + pmscustomer, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                console.log(_pmsvalue);
                _pmsvalue += 1;
        } else {
            console.log("Date not matched")
        }
      }
      setPmscountvalue(_pmsvalue)
    //   return pmscountvalue;
    });
}


}


    useEffect(() => {
        if (record.length > 0) {
          // Call the function to split the data into three periods and check the current date
          splitDataIntoThreeMonths();
        }
      }, [record]);
      console.log(pmscountvalue.length)
    
    var outcount = record.filter(warranty => warranty.To < date);
 
    const piedata = [
     { name: "Total User", users: record.length, backgroundColor: "#FF6310" },
     { name: "Warranty", users: warrantycount.length, backgroundColor: "#FF6310" },
     { name: "PMS", users: warrantycount.length, backgroundColor: "#FF6250" },
     { name: "Out-of-War.", users: outcount.length, backgroundColor: "#FF6100" },
   ];
return (
    <div className="dashboard">
<div class="row mb-2">
<div class="col-xl-3 col-sm-6 py-2">
    <Link to='./total'>
    <div class="card bg-success text-white h-100">
        <div class="card-body bg-success" style={{backgroundColor:"#57b960"}}>
            <div class="rotate">
                <i class="fa fa-user fa-4x"></i>
            </div>
            <h6 class="text-uppercase">Customers</h6>
            <h1 class="display-4">{record.length}</h1>
        </div>
    </div>
    </Link>
</div>
<div class="col-xl-3 col-sm-6 py-2">
    <Link to="./count">
    <div class="card text-white bg-danger h-100">
        <div class="card-body bg-danger">
            <div class="rotate">
            <i class="fas fa-calendar-check fa-4x"></i>
            </div>
            <h6 class="text-uppercase">Warrenty</h6>
            <h1 class="display-4">{warrantycount.length}</h1>
        </div>
        
    </div>
    </Link>
</div>

<div class="col-xl-3 col-sm-6 py-2">
    <Link to="./femalecount">
    <div class="card text-white bg-info h-100">
    <div class="card-body bg-danger">
            <div class="rotate">
            <i class="fas fa-calendar-alt fa-4x"></i>
            </div>
            <h6 class="text-uppercase">PMS</h6>
            <h1 class="display-4">{pmscountvalue}</h1>
        </div>
    </div>
    </Link>
</div>

<div class="col-xl-3 col-sm-6 py-2">
    <Link to="./above">
    <div class="card text-white bg-warning h-100">
        <div class="card-body">
            <div class="rotate">
                <i class="fas fa-calendar-times fa-4x"></i>
            </div>
            <h6 class="text-uppercase">Out of Warrenty</h6>
            <h1 class="display-4">{outcount.length}</h1>
        </div>
    </div>
    </Link>
</div>
</div>
<div>
</div>
<div class="row ">
<div class="col-lg-6 col-md-6 col-sm-12">
<h4 className='title mt-3 mb-3 text-center text-secondary'>Data in Bar-Chart</h4>
<BarChart
        width={550}
        height={270}
        data={piedata}
        margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
        }}
        barSize={30}
        >
        <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 15, right: 10 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>

</div>

<div className="col-lg-6 col-md-6 col-sm-12 col-sm-offset-5">
    <h4 className='title mt-3 text-center text-secondary'>Data in Pie-Chart</h4>
     <div className="m" style={{height:"260px",width:"400px"}}> 
     <PieChart width={600} height={260} backgroundColor={"#FF6384"}>
        <Pie
            dataKey="users"
            isAnimationActive={false}
            data={piedata}
            cx={300}
            cy={130}
            outerRadius={90}
            fill="#33ccff"
            label
        />
        <Tooltip />
        </PieChart>
     </div>
     </div>

</div>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
</div>
           
)
}

export default Dashboard