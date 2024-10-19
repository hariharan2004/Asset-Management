import React from "react";
import '../Styles/DashboardProfile.css';
const DashboardProfile = () => {
    const totalAsset= [
        {
            invested: '$600',
            current:'$600',
            roi:'+$1200',
            roipercent:'+216'
        }
      ];
      const vaultData = [
        {
          name: 'BTC',
          invested: '$100',
          current: '$200',
          profit: '$100',
          roi: '100%',
        },
        {
          name: 'ETH',
          invested: '$150',
          current: '$250',
          profit: '$100',
          roi: '67%',
        },
      ];
    const portData = [
    {
      name: 'BTC',
      invested: '$100',
      current: '$200',
      profit: '$100',
      roi: '100%',
    },
    {
      name: 'ETH',
      invested: '$150',
      current: '$250',
      profit: '$100',
      roi: '67%',
    },
  ];
  return (
    <div className="profile-container">
        <div className="profile-detail-1">
        <div className="profile-totalasset-container">
            <h1 className="profile-totalasset-heading" style={{color:'#FF6F00'}}>TOTAL ASSET</h1>
            {totalAsset.map((asset, index) => (
                <div key={index}>
                <div className="profile-totalasset-row">
                    <span style={{color:'#FF6F00'}}>INVESTED</span>
                    <span>{asset.invested}</span>
                </div>
                <div className="profile-totalasset-row">
                    <span style={{color:'#FF6F00'}}>CURRENT</span>
                    <span style={{color:'#00FF44'}}>{asset.current}</span>
                </div>
                <div className="profile-totalasset-row">
                    <span style={{color:'#FF6F00'}}>ROI</span>
                    <span style={{color:'#00FF44'}}>{asset.roi}</span>
                </div>
                <div className="profile-totalasset-row">
                    <span style={{color:'#FF6F00'}}>ROI(%)</span>
                    <span style={{color:'#00FF44'}}>{asset.roipercent}</span>
                </div>
                </div>
            ))}
            </div>

            <div className="profile-vault">
                <h1 className="profile-vault-heading" style={{color:'#FF6F00'}}>INVESTED VAULTS</h1>
                <div className="vaults-header">
                    <span style={{color:'#FF6F00'}}>VAULTS</span>
                    <span style={{color:'#FF6F00'}}>INVESTED</span>
                    <span style={{color:'#FF6F00'}}>RETURN</span>
                    <span style={{color:'#FF6F00'}}>PROFIT</span>
                    <span style={{color:'#FF6F00'}}>ROI</span>
                </div>
                    {vaultData.map((asset,index)=> (
                        <div className="profile-vault-row" key={index}>
                            <span>{asset.name}</span>
                            <span >{asset.invested}</span>
                            <span style={{color:'#00FF44'}}>{asset.current}</span>
                            <span style={{color:'#00FF44'}}>{asset.profit}</span>
                            <span style={{color:'#00FF44'}}>{asset.roi}</span>
                        </div>
                    ))}
            </div>
        </div>
        <div className="profile-detail-2">
            <div className="profile-roi">
                <h1 className="profile-roi-header" style={{color:'#FF6F00'}}>ROI GRAPH</h1>
            </div>
            <div className="profile-port">
                <h1 className="profile-port-heading" style={{color:'#FF6F00'}}>PORTFOLIO MANAGER</h1>
                    <div className="port-header">
                        <span style={{color:'#FF6F00'}}>TOKEN</span>
                        <span style={{color:'#FF6F00'}}>INVESTED</span>
                        <span style={{color:'#FF6F00'}}>RETURN</span>
                        <span style={{color:'#FF6F00'}}>PROFIT</span>
                        <span style={{color:'#FF6F00'}}>ROI</span>
                    </div>
                        {portData.map((asset,index)=> (
                            <div className="profile-port-row" key={index}>
                                <span>{asset.name}</span>
                                <span>{asset.invested}</span>
                                <span style={{color:'#00FF44'}}>{asset.current}</span>
                                <span style={{color:'#00FF44'}}>{asset.profit}</span>
                                <span style={{color:'#00FF44'}}>{asset.roi}</span>
                            </div>
                        ))}     
            </div>
        </div>
    </div>
  )
    
    
}
export default DashboardProfile;