import React, { useState, useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { IPetSitterWithPetServicesRes } from "../../PetsitterInfoModify/types/petsitter.types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface IProps2 {
  services: IPetSitterWithPetServicesRes[];
  reset: boolean;
  onChange: (list: any) => void;
}
export default function MultipleSelectChip({
  services,
  reset,
  onChange,
}: IProps2) {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  useEffect(() => {
    setPersonName([]);
  }, [reset]);
  const handleChange = (e: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = e;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    onChange(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">옵션</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => {
                const service = services.find(
                  (item) => item.petSitterWithPetServiceId === parseInt(value)
                );
                return (
                  <Chip
                    key={value}
                    label={service ? service.withPetServiceName : ""}
                  />
                );
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {services &&
            services.map((service) => (
              <MenuItem
                key={service.petSitterWithPetServiceId}
                value={service.petSitterWithPetServiceId}
                style={getStyles(
                  service.petSitterWithPetServiceId.toString(),
                  personName,
                  theme
                )}
              >
                {service.withPetServiceName}(
                {service.petSitterWithPetServicePrice} 원)
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
