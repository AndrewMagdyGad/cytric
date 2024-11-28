import { forwardRef } from "react";
import { TextField, TextFieldProps, Typography } from "@mui/material";
import styled from "styled-components";
import React from "react";

import { Spacing } from "../constants/Spacing";
import DarkColors from "../../theme/dark/DarkColors";

type Props = {
    errorText?: string;
};

const SharedInput = forwardRef<HTMLInputElement, TextFieldProps & Props>(
    (props, ref) => {
        const { errorText, ...restProps } = props;

        return (
            <InputWrapper>
                <StyledInput
                    {...restProps}
                    error={!!restProps?.error || !!errorText}
                    ref={ref}
                />
                {typeof errorText === "string" && (
                    <StyledError>{errorText}</StyledError>
                )}
            </InputWrapper>
        );
    }
);

export default React.memo(SharedInput);

const InputWrapper = styled.div`
    width: 100%;
`;

const StyledInput = styled(TextField)`
    &.MuiFormControl-root {
        margin: ${Spacing.P0};
    }
    & .MuiOutlinedInput-root {
        color: white;
        width: 100%;
        position: relative;
        background-color: ${DarkColors.INPUT_COLOR};
        border-radius: ${Spacing.P10};
    }
    & .MuiFormHelperText-root {
        position: absolute;
        margin: ${Spacing.P0};
        bottom: -${Spacing.P24};
    }

    &.Mui-focused {
        border: 1px solid ${DarkColors.BACKGROUND_COLOR};
        background-color: white;
    }
`;

const StyledError = styled(Typography)`
    width: 100%;
    min-height: ${Spacing.P20};
    color: "#EB5757";
`;
