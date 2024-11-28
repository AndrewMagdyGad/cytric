import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { forwardRef } from "react";
import styled from "styled-components";
import { Spacing } from "../constants/Spacing";

type Props = ButtonProps & { isLoading?: boolean };

const SharedButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    const { disabled, isLoading, ...restProps } = props;

    const buttonDisabled = disabled || isLoading;

    return (
        <StyledButton
            {...restProps}
            disabled={buttonDisabled}
            startIcon={
                isLoading ? <CircularProgress size={16} /> : props.startIcon
            }
            ref={ref}
        />
    );
});

export default SharedButton;

const StyledButton = styled(Button)`
    &.Mui-disabled {
        color: gray !important;
    }

    &.MuiButton-containedPrimary {
        border-radius: ${Spacing.P10};
        padding: ${Spacing.P16};
        text-transform: none;
        background-color: ${({ theme }) => theme.colors.PRIMARY};
        &:hover {
            background-color: #0da556;
        }
    }

    &.MuiButton-textPrimary {
        border-radius: ${Spacing.P10};
        padding: ${Spacing.P16};
        text-transform: none;
        color: white;
        &:hover {
            background-color: #11556d;
        }
    }

    &.MuiButton-outlinedPrimary {
        border-radius: ${Spacing.P10};
        border: 1px solid white;
        padding: ${Spacing.P16};
        text-transform: none;
        color: white;
        &:hover {
            background-color: #11556d;
        }
    }
`;
