import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { IoArrowBack } from 'react-icons/io5';
import { ShinyButton } from '@/components/ui/ShinyButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { submitCode, checkSubmission } from '@/services/compilerApi';

// Language ID mapping for Judge0
const LANGUAGE_IDS = {
    javascript: 63,
    typescript: 74,
    python: 71,
    java: 62,
    cpp: 54
};

export const Terminal = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("// Welcome to the Code Editor\n// Start typing your code here");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("vs-dark");
    const [status, setStatus] = useState("idle");
    const [executionTime, setExecutionTime] = useState(null);
    const [memoryUsage, setMemoryUsage] = useState(null);

    const handleCompile = async () => {
        setStatus("running");
        try {
            // Submit code to Judge0
            const languageId = LANGUAGE_IDS[language];
            const response = await submitCode(languageId, code, input);
            const token = response.data.token;

            // Poll for results
            let result;
            do {
                await new Promise(resolve => setTimeout(resolve, 1000));
                result = await checkSubmission(token);
            } while (result.data.status?.id <= 2); // 1=In Queue, 2=Processing

            // Process results
            const outputData = result.data;
            setStatus(outputData.status.id === 3 ? "success" : "error");

            // Decode base64 output
            if (outputData.stdout) {
                setOutput(atob(outputData.stdout));
            } else if (outputData.stderr) {
                setOutput(atob(outputData.stderr));
            } else if (outputData.compile_output) {
                setOutput(atob(outputData.compile_output));
            }

            setExecutionTime(outputData.time * 1000); // Convert to ms
            setMemoryUsage(`${(outputData.memory / 1024).toFixed(2)} MB`);

            // Show toast notification
            if (outputData.status.id === 3) {
                toast.success('Code compiled and executed successfully!');
            } else {
                toast.error(`Error: ${outputData.status.description}`);
            }
        } catch (error) {
            setStatus("error");
            setOutput(error.message);
            toast.error('Failed to compile and execute code');
        }
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col rounded-lg overflow-hidden shadow-xl">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#1a1a1a] border-b border-gray-700 gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <ShinyButton
                        onClick={() => navigate('/dashboard/apps')}
                        variant="ghost"
                        size="sm"
                        icon={<IoArrowBack />}
                        className="backdrop-blur-md"
                    />
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[180px] bg-[#2d2d2d] border-gray-700 text-white">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="w-[180px] bg-[#2d2d2d] border-gray-700 text-white">
                            <SelectValue placeholder="Select Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="vs-dark">Dark</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    onClick={handleCompile}
                    disabled={status === 'running'}
                    variant={status === 'running' ? 'secondary' : 'default'}
                    className="w-full sm:w-auto"
                >
                    {status === 'running' ? 'Running...' : 'Run Code'}
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row flex-1 min-h-0">
                {/* Editor Section */}
                <div className="w-full lg:w-3/5 h-[400px] lg:h-full">
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        theme={theme}
                        onChange={(value) => setCode(value)}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            padding: { top: 10, bottom: 10 }
                        }}
                    />
                </div>

                {/* Output Section */}
                <Separator orientation="vertical" className="hidden lg:block" />
                <div className="w-full lg:w-2/5 flex flex-col bg-[#1e1e1e] border-t lg:border-t-0 border-gray-700">
                    {/* Status Bar */}
                    <div className="flex items-center justify-between p-4 bg-[#252526] border-b border-gray-700">
                        <div className="flex items-center gap-4 text-sm">
                            <span className={cn(
                                "px-2 py-1 rounded-md font-medium",
                                status === 'success' ? 'bg-green-600/20 text-green-400' :
                                status === 'error' ? 'bg-red-600/20 text-red-400' :
                                status === 'running' ? 'bg-yellow-600/20 text-yellow-400' :
                                'bg-gray-600/20 text-gray-400'
                            )}>
                                {status.toUpperCase()}
                            </span>
                            {executionTime && <span className="text-gray-400">Time: {executionTime}ms</span>}
                            {memoryUsage && <span className="text-gray-400">Memory: {memoryUsage}</span>}
                        </div>
                    </div>

                    {/* Input/Output Areas */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="p-4 border-b border-gray-700">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Input</label>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full h-24 bg-[#2d2d2d] text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter input here..."
                            />
                        </div>

                        <div className="flex-1 p-4 overflow-auto">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Output</label>
                            <pre className="w-full h-full bg-[#2d2d2d] text-white p-2 rounded-md border border-gray-700 font-mono text-sm overflow-auto">
                                {output || 'Program output will appear here...'}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 