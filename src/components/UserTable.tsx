"use client"

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

import { UserCredential } from '@/lib/types'

export default function UserTable({ initUsers }: { initUsers: UserCredential[] }) {
    const [users, setUsers] = useState(initUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [userToDelete, setUserToDelete] = useState<UserCredential | null>(null)

    const filteredUsers = users?.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDeleteUser = (user: UserCredential) => {
        setUsers(users?.filter(u => u.userId !== user.userId))
        setUserToDelete(null)
    }

    const handleUpdateRole = (userId: string, newRole: string) => {
        setUsers(users.map(user =>
            user.userId === userId ? { ...user, role: newRole } : user
        ))
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4 text-blue-900">User Credentials</h1>
            <Input
                type="text"
                placeholder="Search by email or username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 border-blue-200 focus:border-blue-400"
            />
            <div className="rounded-md border border-blue-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-blue-50">
                            <TableHead className="text-blue-800">Email</TableHead>
                            <TableHead className="text-blue-800">Username</TableHead>
                            <TableHead className="text-blue-800">Created At</TableHead>
                            <TableHead className="text-blue-800">Verified</TableHead>
                            <TableHead className="text-blue-800">Role</TableHead>
                            <TableHead className="text-right text-blue-800">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers?.map((user) => (
                            <TableRow key={user.userId} className="hover:bg-blue-50">
                                <TableCell className="text-blue-700">{user.email}</TableCell>
                                <TableCell className="text-blue-700">{user.userName || 'N/A'}</TableCell>
                                <TableCell className="text-blue-700">{format(new Date(user.createdAt), 'PP')}</TableCell>
                                <TableCell>
                                    <Badge variant={user.isVerified ? "default" : "destructive"} className={user.isVerified ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}>
                                        {user.isVerified ? 'Verified' : 'Not Verified'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-blue-700">{user.role || 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-white border-blue-200">
                                            <DropdownMenuItem onSelect={() => setUserToDelete(user)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                                <Trash className="mr-2 h-4 w-4" />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                <UserCog className="mr-2 h-4 w-4" />
                                                <span>Update Role</span>
                                                <Select
                                                    onValueChange={(value) => handleUpdateRole(user.userId, value)}
                                                    defaultValue={user.role || undefined}
                                                >
                                                    <SelectTrigger className="w-[180px] ml-2 border-blue-200">
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="user">User</SelectItem>
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                        <SelectItem value="moderator">Moderator</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-blue-900">Are you sure you want to delete this user?</DialogTitle>
                        <DialogDescription className="text-blue-700">
                            This action cannot be undone. This will permanently delete the user
                            account and remove their data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setUserToDelete(null)} className="border-blue-200 text-blue-600 hover:bg-blue-50">Cancel</Button>
                        <Button variant="destructive" onClick={() => userToDelete && handleDeleteUser(userToDelete)} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}