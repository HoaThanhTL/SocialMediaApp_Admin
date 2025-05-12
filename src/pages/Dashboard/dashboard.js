import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Box, Chip, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Header from "../../../src/components/Header";
import StatBox from "../../../src/components/StatBox";
import { tokens } from "../../../src/theme";
import { useDispatch, useSelector } from "react-redux";
import ApexCharts from "apexcharts";
import api from "../../api/api";
import {
  getAllTotalComment,
  getAllTotalInvoice,
  getAllTotalPost,
  getAllTotalUser,
} from "../../redux/apiThunk/system";
import { Api, Label } from "@mui/icons-material";
function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}
const Dashboard = () => {
  const dispatch = useDispatch();
  const [totalPost, setTotalPost] = useState(null);
  const [totalInvoice, setTotalInvoice] = useState(null);
  const [totalOrderStatus, setTotalOrderStatus] = useState(null);
  const [totalOrder, setTotalOrder] = useState(null);
  const [totalComment, setTotalComment] = useState(null);
  const [dataChart, setDataChart] = useState([0, 0, 0]);
  const [dataPost, setDataPost] = useState([]);
  useEffect(() => {
    const fetchSequentially = async () => {
      try {
        const userResult = await dispatch(getAllTotalUser());
        setTotalOrder(userResult?.payload?.totalUsers);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const postResult = await dispatch(getAllTotalPost());
        setTotalPost(postResult?.payload?.totalPost);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const invoiceResult = await dispatch(getAllTotalInvoice());
        setTotalInvoice(invoiceResult?.payload?.total);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const commentResult = await dispatch(getAllTotalComment());
        console.log({ commentResult })
        setTotalComment(commentResult?.payload);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await api.get("/odata/Users/GetStaticUser/User")
        setDataChart([response?.data?.data?.userNormal, response?.data?.data?.userVIP, response?.data?.data?.userPremium])
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const responsePost = await api.get("/odata/Posts/Active/TopLikePost")
        setDataPost(responsePost?.data || [])
        console.log(responsePost.data)
      } catch (error) {
        console.error("Error fetching data sequentially:", error);
      }
    };
    fetchSequentially();
  }, [dispatch]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const chartRef = useRef(null);
  useEffect(() => {

    const labels = ["Người dùng chưa đăng kí gói ", "Đăng ký gói VIP", "Đăng ký gói PREMIUM"];
    // const series = [25, 15, 10, 20];
    const series = dataChart;
    const options = {
      series: series,
      chart: {
        width: 500,
        type: "pie",
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      dataLabels: {
        style: {
          fontSize: '1rem',
        },
      },


    };

    const chart = new ApexCharts(chartRef.current, options);

    // Render the chart
    chart.render();
    // Destroy the chart when the component is unmounted
    return () => {
      chart.destroy();
    };


  }, [totalOrderStatus, chartRef, dataChart]);

  return (
    <Box m="20px" sx={{ height: "95vh" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Bảng điều khiển" subtitle="Thống kê dữ liệu hệ thống" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalOrder}
            subtitle="Tổng người dùng hệ thống"
            progress="0.3"
            // increase="+25%"
            icon={
              <PermIdentityIcon sx={{ color: "#3366CC", fontSize: "32px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalPost}
            subtitle="Bài viết đã đăng trong hệ thống"
            progress="0.50"
            // increase="+21%"
            icon={
              <DescriptionOutlinedIcon
                sx={{ color: "#3366CC", fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalInvoice}
            subtitle="Tổng số tiền đã thanh toán trong 7 ngày gần đây "
            progress="0.30"
            // increase="+5%"
            icon={<PaidOutlinedIcon sx={{ color: "red", fontSize: "32px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalComment ? totalComment?.commentCount : ""}
            subtitle={"Phong cách được bình luận nhiều nhất" + "  " + totalComment?.styleName}
            progress="0.80"
            // increase="+43%"
            icon={
              <SmsOutlinedIcon sx={{ color: "#009900", fontSize: "26px" }} />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            height: "65vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box ref={chartRef} height="60%" />
          <Typography
            variant="h5"
            color="red"
            sx={{ marginBottom: "10px", fontWeight: "bold" }}
          >
            Số lượng người dùng sử dụng dịch vụ hệ thống
          </Typography>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ height: "65vh" }}
        >

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.blueAccent[700]} variant="h5" fontWeight="600">
              Top 5 bài đăng nhiều lượt like trong hệ thống
            </Typography>
          </Box>
          {dataPost.map((data) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{ marginRight: "10px" }}>
                  <img src={data?.image} style={{ width: "100px", height: "100px" }} />
                </div>
                <div>
                  <Typography color={"#32CD32"} variant="h6" fontWeight="600">
                    {data?.content}
                  </Typography>
                  <Typography color={"red"} fontWeight="400">
                    Like: {data?.likes?.length}
                  </Typography>

                  <Typography color={"#FF69B4"}>
                    Hashtags: {data?.hashtags?.map((label) => (
                      <Chip label={label} color="warning" />
                    ))}
                  </Typography>
                  <Typography color={"#000000"} marginTop={1}>
                    StyleName: {data?.styleName?.map((label1) => (
                      <Chip label={label1} color="info" />
                    ))}
                  </Typography>
                </div>
              </Box>

              {/* <Box backgroundColor={"#33CCFF"} p="5px 10px" borderRadius="4px">
                abc bài viết
              </Box> */}
            </Box>
          ))}
        </Box>

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ height: "65vh" }}
        >
          
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;


{/* <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top 10 sản phẩm bán chạy nhất trong 7 ngày qua
            </Typography>
          </Box> */}
{/* {dashboardData?.FiveNewOrders && dashboardData?.FiveNewOrders.map((transaction, i) => ( */ }
{/* <Box
            // key={`${transaction.ID}-${i}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography color={"#00CC00"} variant="h5" fontWeight="600">
                Name
              </Typography>
              <Typography color={colors.grey[100]} fontWeight="400">
                Số lượng
              </Typography>

              <Typography color={"#FF3300"}>Số lượng đã bán</Typography>
            </Box>

            <Box backgroundColor={"#33CCFF"} p="5px 10px" borderRadius="4px">
              Giá
            </Box>
          </Box> */}
