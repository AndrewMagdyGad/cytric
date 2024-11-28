import styled from "styled-components";
import { Spacing } from "../../shared/constants/Spacing";
import { Stack, Typography } from "@mui/material";
import SharedInput from "../../shared/component/SharedInput";
import { useContext, useEffect, useState } from "react";
import SharedButton from "../../shared/component/SharedButton";
import { FileUploadContext } from "../../context/FileUploadContext";
import { useNavigate } from "react-router-dom";
import { useCreateMutation } from "./redux/movies.api";
import { z } from "zod";
import { useSnackbar } from "notistack";

function AddMovie() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [publisehd_year, setPublishedYear] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const { file, fileError, filePreview, handleNewFile, handleRemoveFile } =
        useContext(FileUploadContext);
    const [addMovie, { isSuccess, isError }] = useCreateMutation();
    console.log(file, filePreview);

    const handleSubmit = () => {
        try {
            if (file) {
                const createMovieSchema = z.object({
                    title: z
                        .string()
                        .min(1, "Title is required")
                        .max(200, "Title cannot exceed 200 characters"),
                    published_year: z
                        .string()
                        .refine(
                            (val) => !isNaN(Number(val)),
                            "Published year must be a valid number"
                        ) // Check if it can be converted to a number
                        .transform((val) => Number(val)) // Convert the string to a number
                        .refine(
                            (num) => Number.isInteger(num) && num >= 1888,
                            "Published year must be 1888 or later"
                        ),
                });

                createMovieSchema.parse({
                    title,
                    published_year: publisehd_year,
                });
                const formData = new FormData();
                formData.append("file", file);
                formData.append("title", title);
                formData.append("published_year", publisehd_year);
                addMovie(formData);
            }
        } catch (error) {
            enqueueSnackbar({ message: String(error), variant: "error" });
        }
    };

    useEffect(() => {
        if (isError) {
            enqueueSnackbar({
                message: "Someting went wrong!",
                variant: "error",
            });
        }

        if (isSuccess) {
            enqueueSnackbar({ message: "movie created", variant: "success" });
            navigate("/movies");
        }
    }, [isSuccess, isError, enqueueSnackbar, navigate]);

    return (
        <Wrapper>
            <Typography mr="auto" variant="h1">
                Create a new movie
            </Typography>
            <FormWrapper direction={{ xs: "column", sm: "row" }}>
                <FileWrapper>
                    {filePreview ? (
                        <>
                            <img
                                src={filePreview}
                                width="100%"
                                height="100%"
                                alt="Preview"
                                style={{ objectFit: "cover" }}
                            />
                            <RemoveButton
                                onClick={handleRemoveFile}
                                variant="contained"
                                color="error"
                            >
                                Remove
                            </RemoveButton>
                        </>
                    ) : fileError ? (
                        <Typography color="error">{fileError}</Typography>
                    ) : (
                        <>
                            <UploadInput
                                type="file"
                                name="file"
                                onChange={(e) => {
                                    if (!e.target.files) {
                                        return;
                                    }
                                    handleNewFile(e.target.files[0]);
                                }}
                            />
                            <Typography>Drop an image here</Typography>
                        </>
                    )}
                </FileWrapper>
                <InfoWrapper direction={{ sm: "column" }} gap={Spacing.P24}>
                    <SharedInput
                        margin="normal"
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <SharedInput
                        margin="normal"
                        id="published_year"
                        name="published_year"
                        label="Publishing Year"
                        type="number"
                        value={publisehd_year}
                        onChange={(e) => setPublishedYear(e.target.value)}
                    />
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        gap={Spacing.P16}
                    >
                        <SharedButton
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate("/movies")}
                        >
                            Cancel
                        </SharedButton>
                        <SharedButton
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Submit
                        </SharedButton>
                    </Stack>
                </InfoWrapper>
            </FormWrapper>
        </Wrapper>
    );
}

export default AddMovie;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: ${Spacing.P52};
    gap: ${Spacing.P82};
`;

const UploadInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
`;

const FormWrapper = styled(Stack)`
    height: 100%;
    width: 100%;
    max-height: 504px;
    gap: ${Spacing.P24};
`;

const FileWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 473px;
    border: 1px dashed #ccc;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InfoWrapper = styled(Stack)`
    height: 100%;
    width: 100%;
    max-width: 473px;
    gap: ${Spacing.P24};
`;

const RemoveButton = styled(SharedButton)`
    &.MuiButtonBase-root {
        position: absolute;
        top: 0;
        right: 0;
        margin: ${Spacing.P8};
        z-index: 1;
    }
`;
