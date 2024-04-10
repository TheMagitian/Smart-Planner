import React from 'react';

function Header({ toggleTasks }) {
    const handleToggleTasks = () => {
        toggleTasks();
    };

    return (
        <div style={styles.headerContainer}>
            <div style={styles.table}>
                <div style={styles.tableRow}>
                    <div style={styles.cell}>
                        <h1 style={styles.headerText}>To-do</h1>
                    </div>
                    <div style={{ ...styles.cell, ...styles.filterCell }}>
                        <button style={styles.filterButton} onClick={handleToggleTasks}>
                            Filter
                        </button>
                    </div>
                </div>
                <div style={styles.tableRow}>
                    <div style={styles.cell}>
                        <p style={styles.categoryText}>Tasks</p>
                    </div>
                    <div style={styles.cell}>
                        <p style={styles.categoryText}>Deadline</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    headerContainer: {
        backgroundColor: 'rgb(24,24,55)',
        padding: '20px',
        color: 'white',
        borderRadius: '0px',
    },
    table: {
        display: 'table',
        width: '100%',
    },
    tableRow: {
        display: 'table-row',
    },
    cell: {
        display: 'table-cell',
        padding: '10px',
        textAlign: 'center',
    },
    headerText: {
        margin: '0',
        fontSize: '38px',
        fontWeight: 'bold',
    },
    categoryText: {
        margin: '0',
        fontSize: '28px',
    },
    filterCell: {
        textAlign: 'right',
    },
    filterButton: {
        backgroundColor: 'transparent',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        border: '2px solid white',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background-color 0.3s, color 0.3s',
        // marginRight: '30px',
    },
    filterButtonHover: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '2px solid rgba(255, 255, 255, 0.7)',
    }
};

export default Header;
