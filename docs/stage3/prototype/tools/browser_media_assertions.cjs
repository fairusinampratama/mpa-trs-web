// Expected public images derive from the same canonical use/clearance model.
// No newly approved activity image implicitly grants its catalogue/homepage use.
async function expectedMediaCount(route) {
 const {canonicalRegistry:r}=await import('../src/domain/index.ts');
 const {resolvePublicMedia}=await import('../src/domain/validate.ts');
 const count=(id,placement)=>resolvePublicMedia(r,id,placement).length;
 if(route==='/')return count('kawi29','home-opening')+count('te11','home-expedition')+count('gh29','home-education-gh')+count('rc29','home-education-rc');
 if(route==='/program/te')return 0; // The edition index intentionally carries no repeated feature image.
 if(route.startsWith('/expedition/')){const id=route.split('/')[2];return count(id,'expedition-lead')+count(id,'expedition-ecology');}
 if(route.startsWith('/activity/'))return count(route.split('/')[2],'activity-documentary');
 return 0;
}
module.exports={expectedMediaCount};
