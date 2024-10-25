import { useState } from 'react'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Trash, UserCog } from 'lucide-react'

interface UserCredential {
    userId: string
    email: string
    userName: string
    createdAt: string
    updatedAt: string
    projectId: string
    isVerified: boolean
    role: string
}

export default function UserTable({ initUsers }: { initUsers: UserCredential[] }) {
    const [users, setUsers] = useState(initUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [userToDelete, setUserToDelete] = useState<UserCredential | null>(null)

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.userName && user.userName.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const handleDeleteUser = (user: UserCredential) => {
        setUsers(users.filter(u => u.userId !== user.userId))
        setUserToDelete(null)
    }

    const handleUpdateRole = (userId: string, newRole: string) => {
        setUsers(users.map(user =>
            user.userId === userId ? { ...user, role: newRole } : user
        ))
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <div className="w-1/3">
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
            </div>

            <div className="rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-[250px]">Email</TableHead>
                            <TableHead className="w-[200px]">Username</TableHead>
                            <TableHead className="w-[150px]">Created</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="w-[100px]">Role</TableHead>
                            <TableHead className="w-[100px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell className="font-medium">{user.email}</TableCell>
                                <TableCell>{user.userName || '-'}</TableCell>
                                <TableCell>{format(new Date(user.createdAt), 'MMM d, yyyy')}</TableCell>
                                <TableCell>
                                    <Badge variant={user.isVerified ? "default" : "destructive"}>
                                        {user.isVerified ? 'Verified' : 'Pending'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="capitalize">{user.role}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                className="flex items-center"
                                                onSelect={() => setUserToDelete(user)}
                                            >
                                                <Trash className="mr-2 h-4 w-4 text-red-500" />
                                                Delete User
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className="flex items-center">
                                                    <UserCog className="mr-2 h-4 w-4" />
                                                    <Select
                                                        onValueChange={(value) => handleUpdateRole(user.userId, value)}
                                                        defaultValue={user.role}
                                                    >
                                                        <SelectTrigger className="w-[130px]">
                                                            <SelectValue placeholder="Select role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="user">User</SelectItem>
                                                            <SelectItem value="admin">Admin</SelectItem>
                                                            <SelectItem value="moderator">Moderator</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {userToDelete?.email}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setUserToDelete(null)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => userToDelete && handleDeleteUser(userToDelete)}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}