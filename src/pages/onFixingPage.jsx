function onFixingPage() {
  return (
    <div style={{
      position: 'fixed', // Use fixed position to keep it in view
      top: '50%', // Vertically center
      left: '50%', // Horizontally center
      transform: 'translate(-50%, -50%)', // Center it properly
      zIndex: 9999,
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Add a background color to make it stand out
      padding: '20px', // Add some padding for content
      borderRadius: '5px', // Add rounded corners
      textAlign: 'center',
      color: 'black'
    }}>        <h3>🚧 Error had been found (Dev is working on it). 🚧</h3>
        <p>Coming Back Soon ...</p>
    </div>  
  )
}

export default onFixingPage