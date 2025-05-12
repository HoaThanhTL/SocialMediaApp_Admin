import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Menu,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import "react-toastify/dist/ReactToastify.css";
// import UpdateForm from "./PopupProduct/UpdateForm";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import IconButton from "@mui/material/IconButton";
import { getAllPackage, updateAllPackage } from "../../redux/apiThunk/system";
import UpdatePackage from "./Popup/UpdatePackage";
function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}
const ListPackage = () => {
  const productsPerRow = 4;
  const productsPerPage = productsPerRow * 2;
  const [visibleProducts, setVisibleProducts] = useState(productsPerPage);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectpackageId, setSelectpackageId] = useState();
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const handleShowMore = () => {
    setVisibleProducts(visibleProducts + productsPerPage);
  };
  const handleShowLess = () => {
    setVisibleProducts(productsPerPage);
  };
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(getAllPackage());
      setIsDataLoaded(true);
    }
  }, [dispatch, isDataLoaded]);
  const products = useSelector((state) => state.getUser.getPackages);
  if (!products || products.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "76.52vh",
        }}
      >
        Chưa có gói nào được tạo
      </div>
    );
  }
  const handleUpdatePackage = (key) => {
    const postToUpdate = products.find((post) => post.packageId === key);
    console.log(postToUpdate);
    setSelectedPostData(postToUpdate);
    setUpdatePopupOpen(true);
    setAnchorEl(null);
  };
  const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("Values: ", values);
      const formData = new FormData();
      formData.append("PackageName", values.PackageName);
      formData.append("Description", values.Description);
      formData.append("Cost", values.Cost);
      if (values.Image) {
        formData.append("Image", values.Image);
      }
      await dispatch(
        updateAllPackage({ key: selectedPostData.packageId, data: formData })
      );
      dispatch(getAllPackage());
      toast.success("Cập nhật thành công");
      resetForm();
      setUpdatePopupOpen(false);
    } catch (error) {
      toast.error("Cập nhật thất bại");
    } finally {
      setSubmitting(false);
    }
  };
  const handleMenuClick = (event, packageId) => {
    setSelectpackageId(packageId);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setSelectpackageId(null);
    setAnchorEl(null);
  };
  const handleSortByPrice = () => {
    const sorted = [...products];

    if (sortOrder === "asc") {
      sorted.sort((a, b) => a.cost - b.cost);
      setSortOrder("desc");
    } else {
      sorted.sort((a, b) => b.cost - a.cost);
      setSortOrder("asc");
    }

    setSortedProducts(sorted);
  };
  const handleSearch = () => {
    if (searchText.trim() === "") {
      setSearchResults([]);
    } else {
      const results = products.filter((product) =>
        product.packageName.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(results);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const resetSearch = () => {
    setSearchText("");
    setSearchResults([]);
  };
  const isSearching = searchText.trim() !== "";
  const hasSearchResults = searchResults.length > 0;

  if (!products || products.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "76.52vh",
        }}
      >
        Sản phẩm chưa được tạo
      </div>
    );
  }
  return (
    <Container sx={{ marginTop: "30px" }}>
      {/* <Typography
        variant="h1"
        sx={{ mb: 7, textAlign: "center" }}
        color="green"
      >
        Các gói đã tạo
      </Typography> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {!isSearching && (
            <IconButton
              onClick={handleSortByPrice}
              style={{
                backgroundColor: "green",
                marginBottom: "15px",
              }}
              aria-label="sort-by-price"
            >
              <FilterAltOutlinedIcon style={{ color: "white" }} />
            </IconButton>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tìm kiếm"
              style={{
                padding: "8px 30px 8px 8px", // Khoảng padding để biểu tượng không bị chồng lên văn bản
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px",
              }}
            />
            <SearchOutlinedIcon
              onClick={handleSearch} // Sự kiện khi icon được nhấn
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer", // Biến con trỏ thành dấu tay khi di chuột qua icon
                color: "#777", // Tuỳ chỉnh màu sắc của biểu tượng tìm kiếm
              }}
            />
          </div>
          {hasSearchResults && (
            <Button
              variant="contained"
              color="success"
              onClick={resetSearch}
              style={{ marginLeft: "10px" }}
            >
              Quay lại
            </Button>
          )}
        </div>
      </div>
      <Grid container spacing={2}>
        {searchResults.length > 0
          ? searchResults.map((product, index) => (
            <Grid item key={product.packageId} xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                style={{ padding: 16, position: "relative" }}
              >
                <Chip
                  label="Mới"
                  color="secondary"
                  style={{ position: "absolute", top: 8, left: 8 }}
                />
                <img
                  src={product?.image}
                  alt={product?.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://img.lovepik.com/free-png/20220110/lovepik-error-icon-png-image_401369148_wh860.png";
                  }}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginTop: 8,
                    fontWeight: "bold",
                    color: "blue",
                  }}
                >
                  {product.packageName}
                </Typography>
                <Typography variant="body2" style={{ color: "red" }}>
                  Giá: {product.cost}
                </Typography>
                <Typography variant="body2" style={{ marginTop: 2, fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: product.description }}>
                </Typography>
              </Paper>
            </Grid>
          ))
          : (sortedProducts.length > 0 ? sortedProducts : products)
            .slice(0, visibleProducts)
            .map((product, index) => (
              <Grid item key={product.packageId} xs={12} sm={6} md={3}>
                <Paper
                  elevation={3}
                  style={{ padding: 16, position: "relative" }}
                >
                  <Chip
                    label="Mới"
                    color="secondary"
                    style={{ position: "absolute", top: 8, left: 8 }}
                  />
                  <img
                    src={product.image}
                    alt={product.image}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src =
                        "https://img.lovepik.com/free-png/20220110/lovepik-error-icon-png-image_401369148_wh860.png";
                    }}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />

                  <Typography
                    variant="subtitle1"
                    style={{
                      marginTop: 8,
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    {product.packageName}
                  </Typography>
                  <Typography variant="body2" style={{ color: "red" }}>
                    Giá (VND): {product.cost}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography variant="body2" style={{ marginTop: 2, fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: product.description }}></Typography>
                    <span style={{ cursor: "pointer" }}>
                      <MoreVertIcon
                        color="action"
                        onClick={(event) =>
                          handleMenuClick(event, product.packageId)
                        }
                      />
                      {selectpackageId === product.packageId && (
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem
                            onClick={() =>
                              handleUpdatePackage(product.packageId)
                            }
                          >
                            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Cập
                            nhật gói dịch vụ
                          </MenuItem>
                        </Menu>
                      )}
                    </span>
                  </Box>
                </Paper>
              </Grid>
            ))}
      </Grid>
      {!isSearching && visibleProducts < products?.length ? (
        <Box textAlign="center" marginTop={2}>
          {visibleProducts <= productsPerPage ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowMore}
              style={{
                color: "green",
                borderColor: "green",
                backgroundColor: "white",
              }}
            >
              Show More
            </Button>
          ) : (
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowLess}
                style={{
                  marginRight: 8,
                  color: "green",
                  borderColor: "green",
                  backgroundColor: "white",
                }}
              >
                Show Less
              </Button>
              {visibleProducts < products.length && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShowMore}
                  style={{
                    color: "green",
                    borderColor: "green",
                    backgroundColor: "white",
                  }}
                >
                  Show More
                </Button>
              )}
            </React.Fragment>
          )}
        </Box>
      ) : null}
      {selectedPostData && (
        <UpdatePackage
          open={updatePopupOpen}
          handleClose={() => setUpdatePopupOpen(false)}
          initialValues={selectedPostData}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </Container>
  );
};

export default ListPackage;
