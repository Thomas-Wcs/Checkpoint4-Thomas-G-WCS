import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/node";
import EditIcon from "@mui/icons-material/Edit";
import useAPI from "../../api/useAPI";
import dataTableStyle from "./DataTableStyle";

function VideosManagement() {
  const api = useAPI();
  const [images, setImages] = useState([]);
  const [videosChanging, setVideosChanging] = useState(true);

  useEffect(() => {
    api
      .get("/images")
      .then((data) => {
        setImages(data.data);
      })
      .catch((error) => console.error(error));
  }, [videosChanging]);

  const handleDeleteVideo = (image) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la moto avec l'ID : ${image} ?`
    );

    if (confirmDelete) {
      api
        .delete(`images/${image}`)
        .then((reponse) => {
          if (reponse.status === 204) {
            // eslint-disable-next-line no-alert
            window.alert(
              `La moto avec l'ID : ${image} a été supprimé avec succès`
            );
          }
        })
        .catch((error) => console.error(error));
      setVideosChanging(!videosChanging);
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "title", headerName: "Title", width: 300, editable: true },
    {
      field: "description_text",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "category_id",
      headerName: "Categorie",
      width: 300,
      editable: true,
    },
    { field: "link", headerName: "Link", width: 150, editable: true },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/videos/${params.row.id}`}>
              <button className="sectionEditBtn" type="submit">
                <EditIcon style={{ width: "100%" }} />
              </button>
            </Link>
            <button
              type="button"
              style={{
                fontFamily: "PT Sans",
                backgroundColor: "none",
                height: "90%",
                margin: "1em",
                padding: "0.9em",
                borderRadius: "20%",
                border: "none",
              }}
              onClick={() => handleDeleteVideo(params.row.id)}
            >
              <DeleteIcon style={{ width: "100%" }} />
            </button>
          </>
        );
      },
    },
  ];

  const rows = images.map((image) => {
    return {
      id: image.id,
      title: image.title,
      description_text: image.description_text,
      category_id: image.categorie_name,
      link: image.link,
      name: image.name,
    };
  });

  return (
    <div className="user-management">
      <h1>Images</h1>
      <Link to="/newVideo">
        <PostAddRoundedIcon
          style={{ fontSize: 48, color: "yellow" }}
          className="addButton"
        />
      </Link>
      <Box
        sx={{
          height: 800,
          width: "100%",
          backgroundColor: "black",
        }}
      >
        <DataGrid
          getRowId={() => Math.floor(Math.random() * 100000000)}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          style={dataTableStyle}
        />
      </Box>
    </div>
  );
}

export default VideosManagement;
