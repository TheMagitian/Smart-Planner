import React, { useState } from 'react';

function Body() {
    // Sample data for tasks
    const [showFinished, setShowFinished] = useState(true); // State to toggle showing finished tasks
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Task 1', finished: false, deadline: '2024-04-15' },
        { id: 2, text: 'Task 2', finished: true, deadline: '2024-04-12' },
        { id: 3, text: 'Task 3', finished: false, deadline: '2024-04-10' },
        { id: 4, text: 'Task 4', finished: false, deadline: '2024-04-20' },
        { id: 5, text: 'Task 5', finished: true, deadline: '2024-04-18' },
        { id: 6, text: 'Task 6', finished: false, deadline: '2024-04-25' },
    ]);

    const handleToggleFinished = () => {
        setShowFinished(prevShowFinished => !prevShowFinished); // Toggle showFinished state
    };

    const handleTaskToggle = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, finished: !task.finished } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div style={styles.bodyContainer}>
            <h2>All Tasks</h2>
            <ul style={styles.taskList}>
                {tasks.map(task => (
                    // Show all tasks if showFinished is true, else show only unfinished tasks
                    (showFinished || !task.finished) && (
                        <li key={task.id} style={task.finished ? styles.finishedTask : styles.unfinishedTask}>
                            <input
                                type="checkbox"
                                checked={task.finished}
                                onChange={() => handleTaskToggle(task.id)}
                            />
                            <span>{task.text}</span>
                            <span style={styles.deadline}>{task.deadline}</span>
                        </li>
                    )
                ))}
            </ul>
            <button style={styles.button} onClick={handleToggleFinished}>
                {showFinished ? "Hide Finished Tasks" : "Show Finished Tasks"}
            </button>
        </div>
    );
}

const styles = {
    bodyContainer: {
        padding: '20px',
		fontSize: '32px',
    },
    taskList: {
        listStyle: 'none',
        padding: 0,
    },
    unfinishedTask: {
        textDecoration: 'none',
    },
    finishedTask: {
        textDecoration: 'line-through',
    },
    deadline: {
        marginLeft: '400px',
    },
	button: {
		borderRadius: '6px',
		backgroundColor: 'rgb(24,24,55)',
		color: 'white',
		fontSize: '24px'
	}
};

export default Body;
