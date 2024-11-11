import React from "react";
import { Box, Skeleton, Paper } from "@mui/material";

function ProfileSkeleton() {
  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
      <Box sx={{ width: "100%", maxWidth: 600, p: 4 }}>
        {/* Header Skeleton */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              variant="circular"
              width={80}
              height={80}
              sx={{ mr: 2 }}
            />
            <Box>
              <Skeleton variant="text" width={120} height={25} />
              <Skeleton variant="text" width={180} height={20} />
            </Box>
          </Box>
          <Skeleton variant="rectangular" width={80} height={36} />
        </Box>

        {/* Profile Details Skeleton */}
        <Box>
          <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
            <Skeleton variant="text" width="45%" height={30} />
            <Skeleton variant="text" width="45%" height={30} />
          </Box>
          <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
            <Skeleton variant="text" width="45%" height={30} />
            <Skeleton variant="text" width="45%" height={30} />
          </Box>
          <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
            <Skeleton variant="text" width="45%" height={30} />
            <Skeleton variant="text" width="45%" height={30} />
          </Box>
        </Box>

        {/* Contact Info Skeleton */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="100%" height={25} />
            <Skeleton variant="text" width="50%" height={20} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProfileSkeleton;
