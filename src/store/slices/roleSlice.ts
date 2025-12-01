import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define the Role interface
export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];
    createdAt: string;
    isActive: boolean;
}

// Define the state interface
interface RoleState {
    roles: Role[];
    loading: boolean;
    error: string | null;
}

// Initial state with sample roles
const initialState: RoleState = {
    roles: [
        {
            id: '1',
            name: 'Admin',
            description: 'Full system access with all permissions',
            permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
            createdAt: new Date().toISOString(),
            isActive: true,
        },
        {
            id: '2',
            name: 'Editor',
            description: 'Can create and edit content',
            permissions: ['read', 'write'],
            createdAt: new Date().toISOString(),
            isActive: true,
        },
        {
            id: '3',
            name: 'Viewer',
            description: 'Read-only access to content',
            permissions: ['read'],
            createdAt: new Date().toISOString(),
            isActive: true,
        },
    ],
    loading: false,
    error: null,
};

// Create the slice
export const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        // Add a new role
        addRole: (state, action: PayloadAction<Omit<Role, 'id' | 'createdAt'>>) => {
            const newRole: Role = {
                ...action.payload,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
            };
            state.roles.push(newRole);
        },

        // Update an existing role
        updateRole: (state, action: PayloadAction<Role>) => {
            const index = state.roles.findIndex(role => role.id === action.payload.id);
            if (index !== -1) {
                state.roles[index] = action.payload;
            }
        },

        // Delete a role
        deleteRole: (state, action: PayloadAction<string>) => {
            state.roles = state.roles.filter(role => role.id !== action.payload);
        },

        // Toggle role active status
        toggleRoleStatus: (state, action: PayloadAction<string>) => {
            const role = state.roles.find(role => role.id === action.payload);
            if (role) {
                role.isActive = !role.isActive;
            }
        },

        // Set loading state
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        // Set error
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        // Set all roles (useful for fetching from API)
        setRoles: (state, action: PayloadAction<Role[]>) => {
            state.roles = action.payload;
        },
    },
});

// Export actions
export const {
    addRole,
    updateRole,
    deleteRole,
    toggleRoleStatus,
    setLoading,
    setError,
    setRoles,
} = roleSlice.actions;

// Selectors
export const selectAllRoles = (state: RootState) => state.roles.roles;
export const selectActiveRoles = (state: RootState) =>
    state.roles.roles.filter(role => role.isActive);
export const selectRoleById = (state: RootState, roleId: string) =>
    state.roles.roles.find(role => role.id === roleId);
export const selectRolesLoading = (state: RootState) => state.roles.loading;
export const selectRolesError = (state: RootState) => state.roles.error;

// Export reducer
export default roleSlice.reducer;
