import React from 'react';
import { ChevronRight, Menu, Search } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const docsData = {
    projectName: "Your Package Name",
    description: "A brief description of your package and what it does",
    version: "1.0.0",
    github: "https://github.com/yourusername/yourpackage",
    npm: "https://www.npmjs.com/package/yourpackage",
    sections: [
        {
            title: "Getting Started",
            items: [
                {
                    title: "Installation",
                    content: `
# Installation

\`\`\`bash
npm install yourpackage
# or
yarn add yourpackage
\`\`\`
          `
                },
                {
                    title: "Quick Start",
                    content: `
# Quick Start

\`\`\`javascript
import { Component } from 'yourpackage';

function App() {
  return <Component />;
}
\`\`\`
          `
                }
            ]
        },
        {
            title: "Components",
            items: [
                {
                    title: "Component Name",
                    content: `
# Component Name

Description of what this component does.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | '' | Description |
| prop2 | number | 0 | Description |

## Example Usage

\`\`\`javascript
import { Component } from 'yourpackage';

function Example() {
  return (
    <Component prop1="value" prop2={42} />
  );
}
\`\`\`
          `
                }
            ]
        }
    ]
};

const Docs = () => {
    const [activeSection, setActiveSection] = React.useState(docsData.sections[0].title);
    const [activeItem, setActiveItem] = React.useState(docsData.sections[0].items[0].title);
    const [isSidebarOpen, setSidebarOpen] = React.useState(true);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white">
                <div className="flex h-16 items-center px-4">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden mr-2"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="flex items-center space-x-4">
                        <h2 className="text-lg font-bold">{docsData.projectName}</h2>
                        <div className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                            v{docsData.version}
                        </div>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <div className="hidden md:flex">
                            <Search className="h-4 w-4 mr-2" />
                            <input
                                type="search"
                                placeholder="Search Docs..."
                                className="w-64 rounded-md border px-3 py-1"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`${isSidebarOpen ? 'block' : 'hidden'
                    } lg:block w-64 border-r bg-white h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto`}>
                    <nav className="p-4 space-y-6">
                        {docsData.sections.map((section) => (
                            <div key={section.title}>
                                <h3 className="font-semibold mb-2">{section.title}</h3>
                                <ul className="space-y-2">
                                    {section.items.map((item) => (
                                        <li key={item.title}>
                                            <button
                                                onClick={() => {
                                                    setActiveSection(section.title);
                                                    setActiveItem(item.title);
                                                }}
                                                className={`flex items-center w-full text-left px-2 py-1 rounded-md ${activeItem === item.title
                                                        ? 'bg-gray-100 text-blue-600'
                                                        : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <ChevronRight className="h-4 w-4 mr-1" />
                                                {item.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 px-4 py-8 lg:px-8">
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader>
                            <CardTitle>
                                {activeItem}
                            </CardTitle>
                            <CardDescription>
                                {docsData.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {docsData.sections
                                .find((s) => s.title === activeSection)
                                ?.items.find((i) => i.title === activeItem)
                                ?.content}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default Docs;