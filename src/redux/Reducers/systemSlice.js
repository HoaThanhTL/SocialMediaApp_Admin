import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBanUserAdmin,
  getAllPackage,
  getAllPostAdmin,
  getAllTotalComment,
  getAllTotalPost,
  getAllTotalUser,
  getAllUser,
} from "../apiThunk/system";

const systemSlice = createSlice({
  name: "system",
  initialState: {
    users: [], // Đổi tên từ getUser thành users cho rõ ràng
    posts: [], // Đổi tên từ getPost thành posts
    bannedUsers: [], // Đổi tên từ getBanUser thành bannedUsers
    totalUsers: [], // Đổi tên từ getTotalUser thành totalUsers
    totalPosts: [], // Thêm để lưu tổng số bài viết
    totalComments: [], // Thêm để lưu tổng số bình luận
    packages: [], // Đổi tên từ getPackages thành packages
    loading: false,
    status: "idle", // Thêm để lưu trạng thái (idle, loading, succeeded, failed)
  },
  reducers: {},
  extraReducers: (builder) => {
    // getAllUser
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.users = action.payload;
        
      })
      
      
      .addCase(getAllUser.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      // getAllPostAdmin
      .addCase(getAllPostAdmin.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getAllPostAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getAllPostAdmin.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      // getAllBanUserAdmin
      .addCase(getAllBanUserAdmin.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getAllBanUserAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.bannedUsers = action.payload;
      })
      .addCase(getAllBanUserAdmin.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      // getAllPackage
      .addCase(getAllPackage.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getAllPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.packages = action.payload;
      })
      .addCase(getAllPackage.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      // getAllTotalUser
      .addCase(getAllTotalUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getAllTotalUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.totalUsers = action.payload;
      })
      .addCase(getAllTotalUser.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      // getAllTotalPost
      .addCase(getAllTotalPost.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getAllTotalPost.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.totalPosts = action.payload; // Sửa: Lưu vào totalPosts
      })
      .addCase(getAllTotalPost.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      })
      // getAllTotalComment
      .addCase(getAllTotalComment.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getAllTotalComment.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.totalComments = action.payload; // Sửa: Lưu vào totalComments
      })
      .addCase(getAllTotalComment.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      });
  },
});

export default systemSlice.reducer;