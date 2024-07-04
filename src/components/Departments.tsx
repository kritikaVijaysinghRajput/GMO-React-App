import React, { useState } from "react";
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Container,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { departmentsData } from "../schema/data";

const Departments: React.FC = () => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleToggleExpand = (department: string) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(department)
        ? prevExpanded.filter((d) => d !== department)
        : [...prevExpanded, department]
    );
  };

  const handleToggleSelect = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      const subDeptPath = `${department}:${subDepartment}`;
      setSelectedDepartments((prevSelected) =>
        prevSelected.includes(subDeptPath)
          ? prevSelected.filter((d) => d !== subDeptPath)
          : [...prevSelected, subDeptPath]
      );
    } else {
      const isSelected = selectedDepartments.includes(department);
      const updatedSelection = isSelected
        ? selectedDepartments.filter((d) => !d.startsWith(department))
        : [
            ...selectedDepartments,
            department,
            ...(departmentsData
              .find((d) => d.department === department)
              ?.subDepartments.map((sd) => `${department}:${sd}`) || []),
          ];
      setSelectedDepartments(updatedSelection);
    }
  };

  const isSubDepartmentSelected = (
    department: string,
    subDepartment?: string
  ) => {
    return selectedDepartments.includes(`${department}:${subDepartment}`);
  };

  const isDepartmentSelected = (department: string) => {
    const departmentSubDepartments =
      departmentsData.find((d) => d.department === department)
        ?.subDepartments || [];
    return departmentSubDepartments.every((subDept) =>
      selectedDepartments.includes(`${department}:${subDept}`)
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <List>
          {departmentsData.map((dept) => (
            <React.Fragment key={dept.department}>
              <ListItem
                button
                onClick={() => handleToggleExpand(dept.department)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isDepartmentSelected(dept.department)}
                    tabIndex={-1}
                    disableRipple
                    onChange={() => handleToggleSelect(dept.department)}
                  />
                </ListItemIcon>
                <ListItemText primary={dept.department} />
                {expanded.includes(dept.department) ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              <Collapse
                in={expanded.includes(dept.department)}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {dept.subDepartments.map((subDept) => (
                    <ListItem
                      key={subDept}
                      button
                      sx={{ pl: 4 }}
                      onClick={() =>
                        handleToggleSelect(dept.department, subDept)
                      }
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={isSubDepartmentSelected(
                            dept.department,
                            subDept
                          )}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText primary={subDept} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Departments;
